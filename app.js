class SLNIC {

    /**
     * The constructor which will initialize the NIC number with using the provided NIC string
     * 
     * @param {The NIC number which is used to be checked} nic 
     */
    constructor(nic) {
        const regex = new RegExp(/^([0-9]{9}[x|X|v|V]|[0-9]{11})$/)

        if(!nic || !regex.test(nic)) {
            this.isValidNICProvided = false
            console.log("A valid NIC should be provided")
            return
        }

        if (nic.length === 10) {
            this.isNewFormat = false
        } else if (nic.length === 11) {
            this.isNewFormat = true
        } else {
            this.isValidNICProvided = false
            return
        }

        this.isValidNICProvided = true
        this.nic = nic
        this.months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        this.gender = ""
        this.birthday = {
            year: 0,
            month: 0,
            day: 0
        }
    }

    /**
     * The method is used to validate and provide a response as a JSON object with 
     * checking the provided birthday information along with the calculated information and
     * checking the provided gender with the calculated gender
     * 
     * @param {Gender to be validated as String} gender 
     * @param {Birthday to be validated as a JSON object with keys [year,month,day]} birthday 
     * 
     * The result will be provided as a JSON object
     * 
     */
    validateNIC(gender, birthday) {

        if(!this.isValidNICProvided) {
            console.log("A valid NIC should be provided")
            return
        }

        const cBirthday = this.getBirthDay()
        const cGender = this.getGender()

        if(!birthday.hasOwnProperty("year") || !birthday.hasOwnProperty("month") || !birthday.hasOwnProperty("day")) {
            return {
                "nic": this.nic,
                "error": "provided birthday object is missing required keys"
            }
        }

        if(cGender.gender.toUpperCase() != gender.toUpperCase()) {
            return {
                "nic": this.nic,
                "error": "Gender does not match"
            }
        }

        if(birthday.year!= cBirthday.birthday.year || birthday.month != cBirthday.birthday.month || birthday.day != cBirthday.birthday.day) {
            return {
                "nic": this.nic,
                "error": "Birthday does not match"
            }
        }


        return {
            "nic": this.nic,
            "result": "Provided information matched"
        }
        
    }

    /**
     * The function which is used to get the birth year with using the provided NIC string
     * 
     */
    getYear() {

        if(!this.isValidNICProvided) {
            console.log("A valid NIC should be provided")
            return
        }

        if (this.isNewFormat) {
            return this.nic.substring(0, 4)
        } else {
            return 1900 + parseInt(this.nic.substring(0, 2))
        }
    }

    /**
     * The function which is used to get the voting status with using the provided NIC string
     * 
     * Status X = Nonvoting Citizen
     * Status V = Noting Citizen
     * The result will be provided as a JSON object
     * 
     */
    getVotingStatus() {

        if(!this.isValidNICProvided) {
            console.log("A valid NIC should be provided")
            return
        }

        if(this.isNewFormat) {
            return {
                "nic": this.nic,
                "result": "The new NIC could not be used to provide voting information"
            }
        }

        if (this.nic.substring(this.nic.length - 1, this.nic.length) === "V" || this.nic.substring(this.nic.length - 1, this.nic.length) === "v") {
            return {
                "nic": this.nic,
                "votingStatus": "Allowed"
            }
        }

        if (this.nic.substring(this.nic.length - 1, this.nic.length) === "X" || this.nic.substring(this.nic.length - 1, this.nic.length) === "x") {
            return {
                "nic": this.nic,
                "votingStatus": "Not-Allowed"
            }
        }
    }

    /**
     * The function which is used to calculate the days with using the provided NIC string
     * inorder to derieve the birthday information
     * 
     */
    getDays() {

        if(!this.isValidNICProvided) {
            console.log("A valid NIC should be provided")
            return
        }

        var days;

        if (this.isNewFormat) {
            days = parseInt(this.nic.substring(4, 7))
        } else {
            days = parseInt(this.nic.substring(2, 5))
        }

        if (days > 500) {
            return (days - 500)
        } else {
            return days
        }
    }

    /**
     * The function which is used to get the birth day information with using the provided NIC string
     * 
     * Result will be provided as a JSON object
     * 
     */
    getBirthDay() {

        if(!this.isValidNICProvided) {
            console.log("A valid NIC should be provided")
            return
        }

        var days = this.getDays()
        const year = this.getYear()
        var month = 0
        var day = 0


        for (var i = 0; i < this.months.length; i++) {
            if (days < this.months[i]) {
                month = i + 1
                day = days
                break;
            } else {
                days = days - this.months[i]
            }
        }

        return {
            "nic": this.nic,
            "birthday": {
                "year": year,
                "month": month,
                "day": day
            }
        }
    }

    /**
     * The function which is used to get the gender with using the provided NIC string
     * 
     * The result will be provided as a JSON object
     * 
     */
    getGender() {

        if(!this.isValidNICProvided) {
            console.log("A valid NIC should be provided")
            return
        }

        if(this.getDays() > 500) {
            return {
                "nic": this.nic,
                "gender" : "Female"
            }
        } else {
            return {
                "nic": this.nic,
                "gender" : "Male"
            }
        }
    }
}

module.exports.SLNIC = SLNIC
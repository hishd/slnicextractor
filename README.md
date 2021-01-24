
# SLNICExtractor

A JS module which enables Sri-Lankan National Identity Card validation. The module will come in handy while validating the provided information such as birthday and gender along with the provided NIC number.

The module is capable of validating the following NIC number types

 - Old NIC number with 10 digits (ex: 853070090V or 853070090X)
 - New NIC number with 11 digits (ex: 19853070090)

# Features

  - Retrieving the birth year
  - Retrieving the voting status for old NIC (Voting citizen or non-voting citizen)
  - Get full birthday information
  - Get gender information

### Installation

Since this is a available through **npm** the installation can be done using  **npm install** comamnd

```
	$ npm install slnicextractor
```

### Usage

After installing you must import the module **slnicextractor**
ex:
```
const  nicValidator = require("slnicextractor")
```

After importing the module you can create an instance of the **SLNIC** class with providing the **nic** string to the constructor
ex:
```
var  nic = new  nicValidator.SLNIC("853070090V")
```

Usages of the methods.

| Method Name | Operation |
| ------ | ------ |
| validateNIC(gender, birthday) | validate and provide a response as a JSON object with checking the provided birthday information along with the calculated information and checking the provided gender with the calculated gender|
| getYear() | function which is used to get the birth year with using the provided NIC string |
| getVotingStatus() | function which is used to get the voting status with using the provided NIC string |
| getBirthDay() | function which is used to get the birth day information with using the provided NIC string |
| getGender() | function which is used to get the gender with using the provided NIC string |


# Examples

```
const  nicValidator = require("slnicextractor")

var  nic = new  nicValidator.SLNIC("953070080v")
```

## validateNIC(gender, birthday)

```
const  birthday = {
	"year" :  1995,
	"month":  11,
	"day":  2
}

console.log(nic.validateNIC("Male",birthday))
```
#### *output*
```
{ nic: '19953070080', result: 'Provided information matched' }
```

## getYear()

```
console.log(nic.getYear())
```

#### *output*
```
1996
```

## getVotingStatus()

```
console.log(nic.getVotingStatus())
```
#### *output*
```
{ nic: '953070080v', votingStatus: 'Allowed' }
```

## getBirthDay()

```
console.log(nic.getBirthDay())
```
#### *output*
```
{ nic: '953070080v', birthday: { year: 1995, month: 11, day: 2 } }
```

## getGender()

```
console.log(nic.getGender())
```
#### *output*
```
{ nic: '953070080v', gender: 'Male' }
```

///////////////////////


class SavingsBond {
	constructor(id, series, denom, issueDate, nextAccrual, finalMaturity, issuePrice, interest, interestRate, value) {
		this.id 			= id;
		this.series 		= series;
		this.denom 			= denom;
		this.issueDate 		= issueDate;
		this.nextAccrual 	= nextAccrual;
		this.finalMaturity 	= finalMaturity;
		this.issuePrice 	= issuePrice;
		this.interest 		= interest;
		this.interestRate 	= interestRate;
		this.value 			= value;
	}
}

// 1) Convert string into object

const stringToArray = (arr) => {
	const newArr = [];
	arr.reduce( (result, current, index) => {
		if (current === 'Totals') {
			result = 1;
		}
		if (!result && current !== '') {
			if (current.length >= 11 && arr[index + 1].length === 2) {
				newArr.push(current);
			} else if (newArr[0] != undefined) {
				if (newArr[0].length >= 11) {
					newArr.push(current);
				}
			}
		}
		return result;
	}, 0);

	return newArr;
}

const arrayToObjArray = (arr) => {
	const savingsBonds = [];
	for (let i = 0; i < arr.length; i += 10) {
		if (arr[i + 9] === undefined) {
			alert('The data that was copied incorrectly. Please make sure to select everything from the first "Serial #" to the last "Note".');
			return null;
		} else {
			const newBond = new SavingsBond(arr[i], arr[i + 1], arr[i + 2], arr[i + 3], arr[i + 4], arr[i + 5], arr[i + 6], arr[i + 7], arr[i + 8], arr[i + 9]);
			savingsBonds.push(newBond);
		}
	}
	return savingsBonds;
}

export const bondStringToObj = str => {
	const arr = stringToArray(str.split(/[\s\n\t]/));
	return arrayToObjArray(arr);
};

// 2) Determine final maturity of value

export const calcMaturityVal = (startVal, interestRate, startDate, endDate) => {
	// Calculate and return the final maturity value
};

// 3) Determine value with designated tax rate
export const calcTaxVal = (val, taxRate) => {
	// Calculate and return the value with the set tax rate
};

// 4) Decide if bond should be cashed or held
export const cashOrHold = (curVal, futureVal) => curVal > futureVal ? 'Cash It' : 'Hold It';

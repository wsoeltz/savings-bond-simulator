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

	calcMaturityVal() {
		// if (this.issueDate.toJSON().slice(0, 10) > '2005-04-01') {

		let yearsRemaining, finalValue;
		yearsRemaining = this.finalMaturity.getFullYear() - (new Date().getFullYear());

		if (yearsRemaining > 10) {
			// 1) determine if bond value is greater than its denom by the 20 year mark
			finalValue = calcInterest(this.value, this.interestRate, yearsRemaining - 10);
			// 2) if it isn't, automatically set the value to its denom
			finalValue = finalValue < this.denom ? this.denom : finalValue;
			// 3) calculate the remaining interest for the last 10 years, compounding every 6 months
			finalValue = calcInterest(finalValue, this.interestRate, 10);
		} else {
			finalValue = calcInterest(this.value, this.interestRate, yearsRemaining);
		}
		this.finalValue = finalValue;
	};

	calcCurrTaxedValue(taxRate) {
		this.currTaxedValue = calcTaxVal(this.value, taxRate);
	};

	calcFinalTaxedValue(taxRate) {
		this.finalTaxedValue = calcTaxVal(this.finalValue, taxRate);
	};

	cashOrHold() {
		if (this.finalTaxedValue) {
			this.toCashOrHold = this.currTaxedValue > this.finalTaxedValue ? 'Cash It' : 'Hold It';
		} else {
			this.toCashOrHold = 'Tax values have not been calculated.';
		}
	};
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
			return null;
		} else {
			const id 			= arr[i];
			const series 		= arr[i + 1];
			const denom 		= parseFloat(arr[i + 2].replace(/[\$,%]/g, ''));
			const issuePrice 	= parseFloat(arr[i + 6].replace(/[\$,%]/g, ''));
			const interest 		= parseFloat(arr[i + 7].replace(/[\$,%]/g, ''));
			const interestRate 	= parseFloat(arr[i + 8].replace(/[\$,%]/g, ''));
			const value 		= parseFloat(arr[i + 9].replace(/[\$,%]/g, ''));

			const issueDateArr 		= arr[i + 3].split('/');
			const nextAccrualArr 	= arr[i + 4].split('/');
			const finalMaturityArr 	= arr[i + 5].split('/');

			const issueDate 	= new Date(issueDateArr[1], issueDateArr[0] - 1);
			const nextAccrual 	= new Date(nextAccrualArr[1], nextAccrualArr[0] - 1);
			const finalMaturity = new Date(finalMaturityArr[1], finalMaturityArr[0] - 1);

			const newBond = new SavingsBond(id, series, denom, issueDate, nextAccrual, finalMaturity, issuePrice, interest, interestRate, value);
			savingsBonds.push(newBond);
		}
	}
	return savingsBonds;
}


const calcInterest = (val, interestRate, years) => {
	for (let i = 0; i < years; i++) {
		let cur = val;
		for (let j = 0; j < 12; j++) {
			cur += (val * (interestRate/100))/12;
			if (j === 5 || j === 11) {
				val = cur;
			}
		}
	};
	return val;
}

const calcTaxVal = (val, taxRate) => val * (1 - (taxRate / 100));

export const bondStringToObj = str => {
	const arr = stringToArray(str.split(/[\s\n\t]/));
	if (arr.length === 0) {
		return null;
	}
	return arrayToObjArray(arr);
};

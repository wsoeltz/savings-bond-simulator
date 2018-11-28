import {elements} from './base';

///////////////////////////////

// 1) Get Input from Fields

export const getInput = () => {
	return {
		data: 		elements.inputDataTextarea.value,
		curTax: 	elements.curTaxRateInput.value,
		futureTax: 	elements.futureTaxRateInput.value
	}
};


// 2) Turn data into table
export const buildTable = () => {
	// 1) Determine number of columns
	// 2) Create a row for each
	// 3) Clear existing table
	// 4) Append table to document
};
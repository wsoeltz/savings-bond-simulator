import {elements} from './base';

export const getInput = () => {
	return {
		data: 		elements.inputDataTextarea.value,
		curTax: 	elements.curTaxRateInput.value,
		futureTax: 	elements.futureTaxRateInput.value
	}
};

export const clearTextInput = () => {
	elements.inputDataTextarea.value = '';
	elements.inputDataTextarea.focus();
}


// 2) Turn data into table
export const buildTable = (data) => {
	const newTable = document.createElement('table');

	// 1) Create number of columns
	const newTableHeader = document.createElement('thead');
	newTableHeader.className = 'thead-light';
	newTableHeader.innerHTML = `
		<tr>
			<th>Serial #</th>
			<th>Issue Date</th>
			<th>Final Maturity Date</th>
			<th>Denom</th>
			<th>Issue Price</th>
			<th>Interest Rate</th>
			<th>Current Value</th>
			<th>Final Est. Value</th>
			<th>Current Taxed Value</th>
			<th>Final Taxed Est. Value</th>
			<th>Cash or Hold?</th>
		</tr>
		`;

	newTable.appendChild(newTableHeader);

	const newTableBody = document.createElement('tbody');
	// 2) Create a row for each
	data.reduce( (result, cur) => {
		const newRow = document.createElement('tr');
		newRow.innerHTML = `
			<td>${cur.id}</td>
			<td>${cur.issueDate.getMonth() + 1}/${cur.issueDate.getFullYear()}</td>
			<td>${cur.finalMaturity.getMonth()}/${cur.finalMaturity.getFullYear()}</td>
			<td>$${cur.denom}</td>
			<td>$${cur.issuePrice}</td>
			<td>${cur.interestRate}%</td>
			<td>$${cur.value}</td>
			<td>$${cur.finalValue.toFixed(2)}</td>
			<td>$${cur.currTaxedValue.toFixed(2)}</td>
			<td>$${cur.finalTaxedValue.toFixed(2)}</td>
			<td>${cur.toCashOrHold}</td>
			`;
		newTableBody.appendChild(newRow);
		return result;
	}, 0);
	newTable.appendChild(newTableBody);


	// 3) Clear existing table
	elements.tableContainer.innerHTML = '';
	newTable.className = 'table table-striped';

	// 4) Append table to document
	elements.tableContainer.appendChild(newTable);

};
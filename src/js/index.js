import 'bootstrap/dist/css/bootstrap.min.css';
import {elements} from './view/base';
import * as view from './view/view';
import * as model from './model/model';

const controller = () => {
	// 1) Get input from view

	const input = view.getInput();

	// 2) Give input to model and get data object
	const data = model.bondStringToObj(input.data);

	if (data === null) {
		alert('The data was copied incorrectly. Please make sure to select everything from the first "Serial #" to the last "Note".');
		view.clearTextInput();
	} else {

		data.forEach(cur =>  {
			// 3) Update Object with final values
			cur.calcMaturityVal();

			// 4) Determine current and future tax values
			cur.calcCurrTaxedValue(input.curTax);
			cur.calcFinalTaxedValue(input.futureTax);

			// 5) Determine if bond should be cashed or held
			cur.cashOrHold();
		});

		// 6) Print the table to the screen
		view.buildTable(data);


		// Console.log the total if all recommendations are followed
		/*let total = data.reduce((result, cur) => {
			if (cur.toCashOrHold === 'Cash It') {
				return result + cur.currTaxedValue;
			} else {
				return result + cur.finalTaxedValue;
			}
		}, 0);

		console.log(total);*/

	}



};

elements.submitBtn.addEventListener('click', () => {
	controller();
});
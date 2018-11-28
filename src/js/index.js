import 'bootstrap/dist/css/bootstrap.min.css';
import {elements} from './view/base';
import * as view from './view/view';
import * as model from './model/model';

const controller = () => {
	// 1) Get input from view

	const input = view.getInput();

	// 2) Give input to model and get data object
	const data = model.bondStringToObj(input.data);

	console.log(data);

	// 3) Update Object with final values


	// 4) Determine current and future tax values


	// 5) Determine if bond should be cashed or held


	// 6) Print the table to the screen


};

elements.submitBtn.addEventListener('click', () => {
	controller();
});
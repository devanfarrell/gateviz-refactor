import { FETCH_CIRCUIT_SUCCESS, CHANGE_INPUTS } from './actions';
import evaluateCircuit from './evaluateCircuit';

export const key = 'circuit';

const reducer = (state = null, action) => {
	switch (action.type) {
		case FETCH_CIRCUIT_SUCCESS: {
			const { parsedCircuit } = action.payload;
			return parsedCircuit;
		}
		case CHANGE_INPUTS: {
			const { id, value } = action.payload;
			const circuit = state;
			const index = circuit.input.findIndex(input => input.id === id);
			circuit.input[index].state = value;
			evaluateCircuit(circuit);

			return {
				input: circuit.input,
				parts: circuit.parts,
				output: circuit.output,
				name: circuit.name
			};
		}

		default:
			return state;
	}
};

export default reducer;

// export default produce(
// 	(draft, action) => {
// 		switch (action.type) {
// 			case FETCH_CIRCUIT_SUCCESS:
// 				const { response, parsedCircuit } = action.payload;
// 				draft.parsedCircuit = parsedCircuit;
// 				draft.response = response;
// 				return;
// 			case CHANGE_INPUTS_SUCCESS:
// 				const circuit = action.payload;
// 				draft.parsedCircuit = circuit;
// 				if (draft.autoEvaluate) {
// 					draft.displayedCircuit = circuit;
// 				}
// 				return;
// 			default:
// 				return;
// 		}
// 	},
// 	{ response: {}, parsedCircuit: null, autoEvaluate: true, displayedCircuit: null }
// );

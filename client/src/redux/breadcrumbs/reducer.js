import { INIT_BREADCRUMB, STEP_INTO_CIRCUIT, STEP_BACK } from './actions';
import produce from 'immer';

export const key = 'breadcrumbs';

// This reducer will keep track of where we are in the circuit by a push breadcrumb style
export default produce((draft, action) => {
	switch (action.type) {
		case INIT_BREADCRUMB:
			draft = [{ name: action.payload, id: 'top', depth: 0 }];
			return;
		case STEP_BACK:
			draft.length = action.payload;
			return;
		case STEP_INTO_CIRCUIT:
			draft.push({ name: action.payload.name, id: action.payload.id, depth: draft.length });
			return;
		default:
			return;
	}
}, []);
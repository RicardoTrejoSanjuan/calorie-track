import type { Activity } from './../types/index';

export type ActivityActions = 
{ type: 'save-activity', payload: { newActivity: Activity } } |
{ type: 'set-activeId', payload: { id: Activity['id'] } } |
{ type: 'delete-activity', payload: { id: Activity['id'] } } |
{ type: 'restart-app' }

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id'],
}

const localStorageActivities = ():Activity[] => {
    const activities = localStorage.getItem('activities');
    return activities ? JSON.parse(activities) : [];
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    actions: ActivityActions
) => {
    if (actions.type === 'save-activity') {
        // ! Este codigo maneja la logica para actualizar el state
        let updatedActivities: Activity[];
        if (state.activeId) {
            updatedActivities = state.activities.map(item => {
                if (item.id === state.activeId) {
                    return {
                        ...actions.payload.newActivity,
                        id: state.activeId
                    }
                }
                return item;
            })
        } else {
            updatedActivities = [...state.activities, actions.payload.newActivity];
        }
        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if (actions.type === 'set-activeId') {
        return {
            ...state,
            activeId: actions.payload.id,
        }
    }

    if (actions.type === 'delete-activity') {
        const deleteActivity = state.activities.filter(item => item.id !== actions.payload.id)
        return {
            ...state,
            activities: deleteActivity,
            activeId: ''
        }
    }

    if (actions.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }
    return state
}
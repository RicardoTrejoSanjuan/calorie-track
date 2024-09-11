import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { categories } from "../data/db";
import type { Activity, Categories } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
};

export default function Form({dispatch, state}: FormProps) {
    const [activity, setActivity] = useState<Activity>(initialState);

    useEffect(() => {
      if (state.activeId) {
        const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
        setActivity(selectActivity);
      }
    }, [state.activeId])
    

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        });
    }

    const isValidActiviy = () => {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0;
    }

    const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: 'save-activity', payload: {newActivity: activity}});
        setActivity({
            ...initialState,
            id: uuidv4(),
        })
    }

    return (
        <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handlerSubmit}>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Category:</label>
                <select
                    name="category"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white">
                    {
                        categories.map((categorie: Categories) => (
                            <option
                                key={categorie.id}
                                value={categorie.id}>{categorie.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Activity:</label>
                <input
                    id="name"
                    type="text"
                    value={activity.name}
                    onChange={handleChange}
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ex. Meal, Orange juice, Salad, Exercise, Weights, Bike" />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calories:</label>
                <input
                    id="calories"
                    type="number"
                    value={activity.calories}
                    onChange={handleChange}
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calories ex. 300 o 500" />
            </div>
            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                value={activity.category === 1 ? 'Save Meal' : 'Save Exercise'}
                disabled={!isValidActiviy()} />
        </form>
    )
}

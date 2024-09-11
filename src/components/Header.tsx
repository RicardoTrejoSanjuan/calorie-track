import { Dispatch, useMemo } from "react"
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type HeaderProps = {
    state: ActivityState,
    dispatch: Dispatch<ActivityActions>,
}


export default function Header({ state, dispatch }: HeaderProps) {
    const hasActivities = () => useMemo(() => state.activities.length > 0, [state.activities])
    return (
        <header className="bg-lime-600 py-3">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <h1 className="text-center text-2xl font-bold text-white">Calorie Track</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="https://rococo-sherbet-b25cad.netlify.app/" target="_blank" className="text-white hover:text-blue-200">Gratuity Calculator</a></li>
                        <li><a href="https://heartfelt-druid-c67a72.netlify.app/" target="_blank" className="text-white hover:text-blue-200">GuitarLa</a></li>
                    </ul>
                </nav>
                <button
                    className="bg-gray-800 hover:bg-gray-900 font-bold uppercase text-white cursor-pointer rounded-lg text-sm py-1 px-2 disabled:opacity-10"
                    onClick={() => dispatch({ type: 'restart-app' })}
                    disabled={!hasActivities()}
                >Restart App</button>
            </div>
        </header>
    )
}

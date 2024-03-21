import useHTTP from "../hooks/useHttp.js";
import MealItem from "./MealItem.jsx";
import Error from './Error.jsx';

const requestConfig = {};

export default function Meals() {
    const { data,
        isLoading,
        error
    } = useHTTP('http://localhost:3000/meals', requestConfig, []);

    console.log(data);

    if (isLoading) {
        return <div className="center"></div>;
    }
    if (error) {
        return <Error title="Failed to fetch meals" message={error} />
    }
    return (
        <ul id="meals">
            {data.map((meal) =>
                (<MealItem key={meal.id} meal={meal} />))}
        </ul>
    );
}
import { useParams } from "react-router-dom";

const categories1 = [{

}]

export default function Subcategory() {
    const params = useParams();
    const { categoryName } = params;

    return <div className="w-full h-full">
        {categoryName == "Laboratory Equipments and Instruments" &&
            <div>Laboratory Equipments and Instruments</div>}
    </div>
}
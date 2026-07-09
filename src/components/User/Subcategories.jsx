import { useParams } from "react-router-dom";

const categories = [{
    1: {
        name: "Electrical Equipment",
        subcategories: ["Circuit Breakers", "Cable Management", "Conductors", "Industrial Fans", "LED Lighting", "Switches & Sockets", "Transformers", "Testing Equipment"]
    },
    2: {
        name: "Material Handling Equipment",
        subcategories: ["Jacks & Hoists", "Lifting Clamps", "Material Lifts", "Trolleys & Carts", "Winches"]
    }
}]

export default function Subcategory() {
    const params = useParams();
    const { categoryName } = params;

    return <div>
        <h2>{categoryName}</h2>
    </div>
}
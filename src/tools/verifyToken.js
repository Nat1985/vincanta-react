import { useSelector } from "react-redux";

const verifyToken = async () => {
    try {
        const { id } = useSelector(state => state.user.userData);
        const token = localStorage.getItem('vincanta-token');
        if (token) {
            // 
        }
    } catch (error) {
        
    }
}
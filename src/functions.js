import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function showAlert(message, type, foc) {
    onFocus(foc);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: message,
        icon: type,
        showConfirmButton: false,
        timer: 1500
    });
}

function onFocus(foc){
    if (foc !== ""){
        document.getElementById(foc).focus();
    }
}
import { fetchApi } from '../../api';


const endPoints = {
    invoice: 'invoice',
    editInvoice: 'invoice/:idInvoice'
}

export const getInvoices = payload => fetchApi(endPoints.invoice);
export const postInvoice = payload => fetchApi(endPoints.invoice, payload, 'post');
export const editInvoice = (payload, idInvoice) => {
    let url = endPoints.editInvoice.replace(':idInvoice',idInvoice);
    return fetchApi(url, 'post', JSON.stringify(payload))
};

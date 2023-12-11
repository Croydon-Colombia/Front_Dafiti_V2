import {DateTime} from 'luxon';
import {DashBoardData} from "../../Models/dash-board-data";
import {Marketplace} from "../../Models/market-place";

const now = DateTime.now();

export const dashboardData: DashBoardData = {
    market_place_metrics: [
        {
            previous_cash_day: 7951000,
            date_start: now,
            date_end: now,
            total_cash_day: 2157400,
            previous_count_sale: 410,
            total_day_count_sale: 62,
            marketplace: {mp_name: 'Dafiti', mp_id: 1, mp_state: true},
            url_icon: 'https://avatars.githubusercontent.com/u/2734833?s=280&v=4',
        },
        {
            previous_cash_day: 1454000,
            date_start: now,
            date_end: now,
            total_cash_day: 650000,
            previous_count_sale: 310,
            total_day_count_sale: 41,
            marketplace: {mp_name: 'Linio', mp_id: 1, mp_state: true},
            url_icon: 'data:image/jpeg;base64,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'
        },
        {
            previous_cash_day: 3158000,
            date_start: now,
            date_end: now,
            total_cash_day: 936001,
            previous_count_sale: 312,
            total_day_count_sale: 91,
            marketplace: {mp_name: 'Mercado Libre', mp_id: 1, mp_state: true},
            url_icon: 'https://play-lh.googleusercontent.com/lO0-UT9yyZ55shpgJVKcBxYGd1MWwdsxoK1GjNcd9FkcYHX4yjjj5OqktP0O1rVoTwU'
        },
        {
            previous_cash_day: 2367800,
            date_start: now,
            date_end: now,
            total_cash_day: 231400,
            previous_count_sale: 109,
            total_day_count_sale: 21,
            marketplace: {mp_name: 'Mercado Shop', mp_id: 1, mp_state: true},
            url_icon: 'https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2018/05/mercadoshops-Logo.png'
        }
    ],
    pending_orders:[
        {
            market_place_id: 3,
            market_place_name: 'Linio',
            order_id: '8595212',
            order_created_at: '2023-02-10 13:45:33',
            order_status: 'Fallo servicios',
            erp_information: {
                erp_status_code: '666',
                erp_process_msj: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum est eu purus eleifend pretium. Nulla imperdiet urna sit amet erat volutpat, quis molestie ex euismod. Quisque sapien elit, ultrices at est vulputate, luctus blandit nulla. Aenean mollis suscipit ex, eu ullamcorper purus lacinia placerat. Fusce tincidunt accumsan semper. Sed nisi neque, vehicula quis sem a, porttitor lobortis dolor. Praesent sit amet tortor ac risus ultricies vulputate'
            },
            order_items:[
                {
                    sku: '3000010-36',
                    seller_item_id: '8595212',
                    item_name: 'Royal Hi Cut Blanco',
                    qty_erp_available: 1,
                    qty_request: 1
                },
                {
                    sku: '3000010-37',
                    seller_item_id: '8595212',
                    item_name: 'Royal Hi Cut Blanco',
                    qty_erp_available: 1,
                    qty_request: 1
                },
                {
                    sku: '3000010-38',
                    seller_item_id: '8595212',
                    item_name: 'Royal Hi Cut Blanco',
                    qty_erp_available: 1,
                    qty_request: 1
                }
            ]
        },
        {
            market_place_id: 3,
            market_place_name: 'Linio',
            order_id: '8595212',
            order_created_at: '2023-02-10 13:45:33',
            order_status: 'Sin Stock',
            erp_information: {
                erp_status_code: '530',
                erp_process_msj: 'Prueba de texto a mostrar',
            },
            order_items:[
                {
                    sku: '3000010-36',
                    seller_item_id: '8595212',
                    item_name: 'Royal Hi Cut Blanco',
                    qty_erp_available: 1,
                    qty_request: 1
                },
                {
                    sku: '3000010-40',
                    seller_item_id: '8595212',
                    item_name: 'Royal Hi Cut Blanco',
                    qty_erp_available: 0,
                    qty_request: 2
                }
            ]
        },
    ]
}


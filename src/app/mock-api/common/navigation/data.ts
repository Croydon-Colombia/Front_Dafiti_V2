/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'dashboard',
        title: 'Dashboard',
        type : 'basic',
        icon    : 'heroicons_outline:home',
        link : '/dashboard'
    },
    {
        id      : 'dafiti',
        title   : 'Dafiti',
        subtitle: 'Informacion general',
        type    : 'group',
        icon    : 'heroicons_outline:shopping-cart',
        children: [
            {
                id      : 'dafiti.inf',
                title   : 'Dafiti',
                type    : 'collapsable',
                icon    : 'heroicons_outline:shopping-cart',
                children: [
                    {
                        id   : 'dafiti.inf.orders',
                        title: 'Ordenes',
                        type : 'basic',
                        icon    : 'heroicons_outline:shopping-cart',
                        link : '/dafiti/orders'
                    },
                    {
                        id   : 'dafiti.inf.tracking',
                        title: 'Guias',
                        type : 'basic',
                        icon    : 'heroicons_outline:shopping-cart',
                        link : '/dafiti/tracking'
                    },
                    {
                        id   : 'dafiti.inf.crossdocking',
                        title: 'Crossdocking',
                        type : 'basic',
                        icon    : 'heroicons_outline:shopping-cart',
                        link : '/dafiti/crossdocking'
                    }
                ]
            }
        ]
    },
    {
        id      : 'inventarios',
        title   : 'Inventarios',
        subtitle: 'Informacion general',
        type    : 'group',
        icon    : 'heroicons_outline:database',
        children: [
            {
                id      : 'inventarios.inf',
                title   : 'Inventarios',
                type    : 'collapsable',
                icon    : 'heroicons_outline:database',
                children: [
                    {
                        id   : 'inventarios.inf.actualizar',
                        title: 'Actualizar referencia',
                        type : 'basic',
                        icon    : 'heroicons_outline:database',
                        link : '/inventarios/actualizar'
                    },
                    {
                        id   : 'inventarios.inf.administrar',
                        title: 'Administración',
                        type : 'basic',
                        icon    : 'heroicons_outline:database',
                        link : '/inventarios/administrar'
                    },
                    {
                        id   : 'inventarios.inf.gestionar',
                        title: 'Gestionar MP',
                        type : 'basic',
                        icon    : 'heroicons_outline:database',
                        link : '/inventarios/gestionar'
                    }
                ]
            }
        ]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];

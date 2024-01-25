import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { ActualizarComponent } from './modules/inventarios/actualizar/actualizar.component';
import { GestionarmpComponent } from './modules/inventarios/gestionarmp/gestionarmp.component';
import { AdministracionComponent } from './modules/inventarios/administracion/administracion.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'dashboard'},

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboard'},

    // Auth routes for guests
    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },

    // User Routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [

            // Dashboards
            {path: 'dashboard', loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)},

            // Dafiti
            {path: 'dafiti', children: [
                    {path: 'orders', loadChildren: () => import('app/modules/dafiti/orders/dafiti.orders.module').then(m => m.DafitiOrdersModule)},
                    {path: 'crossdocking', loadChildren: () => import('app/modules/dafiti/crossdocking/dafiti.crossdocking.module').then(m => m.DafitiCrossdockingModule)}
                ]
            },

            //Inventarios
            {path:'inventarios', children:[
                {path:'actualizar', component:ActualizarComponent},
                {path:'gestionar', component:GestionarmpComponent},
                {path:'administrar', component:AdministracionComponent}
            ]}
        ]
    },

];

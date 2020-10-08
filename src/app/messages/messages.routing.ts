import { SentComponent } from './components/sent/sent.component';
import { ReceivedComponent } from './components/received/received.component';
import { UserGuard } from './../services/user.guard';
import { AddComponent } from './components/add/add.component';
import { MainComponent } from './components/main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const messagesRoutes: Routes = [
    {
        path: 'messages', component: MainComponent,
        children: [
            { path: '', redirectTo: 'received', pathMatch: 'full' },
            { path: 'send', component: AddComponent, canActivate: [UserGuard] },
            { path: 'received', component: ReceivedComponent, canActivate: [UserGuard] },
            { path: 'received/:page', component: ReceivedComponent, canActivate: [UserGuard] },
            { path: 'sent', component: SentComponent, canActivate: [UserGuard] },
            { path: 'sent/:page', component: SentComponent, canActivate:[UserGuard] }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(messagesRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class MessagesRoutingModule {}
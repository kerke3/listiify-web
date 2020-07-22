import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { GridComponent } from './common/grid/grid.component';
import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';
import { ListComponent } from './common/list/list.component';
import { AddTaskComponent } from './tasks/add-task.component';
import { AuthService } from './auth/auth.service';
import { UserCardService } from './users/users.service';
import { TasksService } from './tasks/tasks.service';
import { environment } from './../environments/environment';
import { NotFoundComponent } from './not-found/not-found.component';
import { UIService } from './ui.service';
import { authReducer } from './auth/auth.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    TasksComponent,
    GridComponent,
    ListComponent,
    AddTaskComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // StoreModule.forRoot(authApp:authReducer),
  ],

  providers: [AuthService, UserCardService, TasksService, UIService],
  bootstrap: [AppComponent],
  entryComponents: [AddTaskComponent],
})
export class AppModule {}

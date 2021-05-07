import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostingDescriptionComponent } from './feature-posting/posting-description/posting-description.component';
import { PostingListComponent } from './feature-posting/posting-list/posting-list.component';

const routes: Routes = [
  { path: '', component: PostingListComponent },
  { path: 'description/:id', component: PostingDescriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

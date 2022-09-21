import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { take } from 'rxjs/operators';
import { PostResponse } from '../models/post.model';
import { QueueProcessor } from '../queue.processor';
import { IAPIService } from './IApiService';

@Injectable({providedIn:'root'})
export class AppService extends QueueProcessor<IAPIService> implements IAPIService{
  constructor(private httpClient: HttpClient){
    super();
  }

  public getPost(postId: string){
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    return this.httpClient.get<PostResponse>(url).pipe(take(1));
  }

}



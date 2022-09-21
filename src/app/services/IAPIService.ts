import { Observable } from "rxjs";
import { PostResponse } from "../models/post.model";

export interface IAPIService{
  getPost(postId: string): Observable<PostResponse>
}
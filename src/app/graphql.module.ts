import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';
import {EnviromentService} from "./services/enviroment/enviroment.service";
import {CookieService} from "./services/cookie/cookie.service";


export function createApollo(httpLink: HttpLink, env: EnviromentService, cookieService: CookieService) {

  const userToken = cookieService.getCookie('userToken');
  const uri = env.environmentConfig.API_URL + env.environmentConfig.GRAPHQL_ENDPOINT;
  const link = httpLink.create({
    uri: (operation) => {
      if(operation.operationName && env.environmentConfig.ENVIRONMENT == 'local'){
        return uri + '?' + operation.operationName
      }else{
        return uri
      }
    },
    headers: new HttpHeaders({
      "X-AUTH-TOKEN": (userToken) ? userToken : ''
    }),
  })


  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, EnviromentService, CookieService],
    },
  ],
})
export class GraphQLModule {}

import { Api } from '@michess/api-service';
import { RestRouter } from './rest/RestRouter';

const from = (api: Api) => {
  const restRouter = RestRouter.from(api);

  return restRouter;
};
export const App = {
  from,
};

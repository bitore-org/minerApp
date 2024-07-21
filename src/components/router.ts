import Navigo from "navigo";

import { HomePage } from "./pages/home/home.module";

export const InitRouter = () => {
  const router = new Navigo("/");

  const PageRoutes = {
    home: {
      path: "/",
      handler: HomePage,
    },
  };

  for (const details of Object.values(PageRoutes)) {
    router.on(details.path, async (params) => {
      console.log(details.path);

      await (details.handler as any)(params);
    });
  }

  router.notFound(() => {
    router.navigate(PageRoutes.home.path);
  });

  router.resolve();

  // Bind click events to all links on the page for client-side navigation.
  router.updatePageLinks();
};

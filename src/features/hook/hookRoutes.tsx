import { HomePage } from "./pages/HomePage";
import { AppLayout } from "components/layouts/AppLayout/AppLayout";
import { UseStateExample } from "./pages/UseStateExample";
import { UseEffectExample } from "./pages/UseEffectExample";
import { UseRefExample } from "./pages/UseRefExample";
import { UseCallbackExample } from "./pages/UseCallbackExample";
import { UseMemoExample } from "./pages/UseMemoExample";

export const hookRoutes = [
  {
    path: "",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "use-state",
        element: (
          <AppLayout>
            <UseStateExample />
          </AppLayout>
        ),
      },
      {
        path: "use-effect",
        element: (
          <AppLayout>
            <UseEffectExample />
          </AppLayout>
        ),
      },
      {
        path: "use-ref",
        element: (
          <AppLayout>
            <UseRefExample />
          </AppLayout>
        ),
      },
      {
        path: "use-callback",
        element: (
          <AppLayout>
            <UseCallbackExample />
          </AppLayout>
        ),
      },
      {
        path: "use-memo",
        element: (
          <AppLayout>
            <UseMemoExample />
          </AppLayout>
        ),
      },
    ],
  },
];

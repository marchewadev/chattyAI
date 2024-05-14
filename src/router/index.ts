import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { getUserProfileService } from '@/services/userService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/AuthView.vue')
    },
    {
      path: '/chat',
      name: 'Chat',
      component: () => import('@/views/ChatView.vue'),
      beforeEnter: async () => {
        try {
          await getUserProfileService();
        } catch (err) {
          // TODO: Maybe add a toast message here? Something like "Your session has expired. Please log in again."
          return { name: 'Home' };
        }
      }
    }
  ]
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const { accessToken } = storeToRefs(userStore);

  // If the user is not authenticated and they try to access a route that is not the Home route, redirect them to the Home route.
  if (!accessToken.value && to.name !== 'Home') {
    return { name: 'Home' };
  }
});

export default router;

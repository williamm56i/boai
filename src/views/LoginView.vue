<template>
    <div class="login-container">
    <Card>
      <template #header>
        <h2 style="text-align: center;">中華民國推動博愛關懷協會</h2>
      </template>
      <template #content>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="account">Username</label>
              <InputText
                id="account"
                v-model="account"
                required
                class="w-full"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <Password
                id="password"
                v-model="pwd"
                :feedback="false"
                toggleMask
                required
                class="w-full"
              />
            </div>
            <Button label="Login" type="submit" class="w-full mt-4" />
          </form>
      </template>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import apiClient from '../request/request';
import { useRouter } from 'vue-router';
const router = useRouter();
let account = ref('');
let pwd = ref('');
const handleSubmit = async () => {
      if (account.value && pwd.value) {
        await apiClient.get('/api/system/generateToken?account=' + account.value).then(res => {
            localStorage.setItem('jwt', res.data);
            router.push('/');
        }).catch(err => {
            console.error(err);
        });
      } else {
        alert('Please fill in both fields.');
      }
    }
</script>
<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.w-full {
  width: 100%;
}

.mt-4 {
  margin-top: 1rem;
}
</style>
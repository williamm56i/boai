<template>
  <div class="footer">
    <img src="../../assets/IMG_2911.PNG" class="large-footer" width="180px" />
    <img src="../../assets/icon.PNG" class="small-footer" width="90px" />
    <table style="margin-left: 30px; margin-top: 5px;">
      <tr>
        <td colspan="2">聯絡我們&nbsp;<i class="pi pi-facebook"></i>&nbsp;<i class="pi pi-instagram"></i></td>
      </tr>
      <tr>
        <td>地址：</td>
        <td>桃園市八德區介壽路一段1033號4樓</td>
      </tr>
      <tr>
        <td>信箱：</td>
        <td>boai@gmail.com</td>
      </tr>
      <tr>
        <td>電話：</td>
        <td>(03)1234-5678</td>
      </tr>
      <tr>
        <td colspan="2">Copyright®中華民國推動博愛關懷協會</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">

</script>

<style>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  background: #000000;
  color: #ffffff;
  font-size: 12px;
  text-align: left;
}

.large-footer {
  display: block;
  padding: 10px 10px 10px 10px;
}

.small-footer {
  display: none;
  padding: 10px 10px 10px 10px;
}

@media (max-width: 800px) {
  .large-footer {
    display: none;
  }

  .small-footer {
    display: block;
  }
}
</style>

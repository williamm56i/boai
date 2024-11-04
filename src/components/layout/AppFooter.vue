<template>
  <div class="footer">
    <img src="/IMG_2911.png" class="large-footer" width="180px" />
    <img src="/icon.png" class="small-footer" width="90px" />
    <table style="margin-left: 30px; margin-top: 5px;">
      <tr>
        <td colspan="2">聯絡我們：
          <a href="https://line.me/ti/g2/P9x8cQjWPV9l-U0cRZhtuCAni9bCA7qT5MjIQw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" target="_blank"><i class="fab fa-line" style="font-size: 16px;"></i>中華民國推動博愛關懷協會</a>&nbsp;
          <a href="https://www.instagram.com/polarischan888/?igsh=NmFuZ2lxbmhuZXF6" target="_blank"><i class="pi pi-instagram"></i>北極星共享空間</a></td>
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
        <td>(03)376-5660</td>
      </tr>
      <tr>
        <td colspan="2">Copyright®中華民國推動博愛關懷協會</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  background: #5cc7e7;
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

a:link, a:visited {
  color: white;
}

a:hover, a:active {
  color: #646cff;
}
</style>

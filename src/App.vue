<template>
  <!-- <div v-if="$cookies.get('token')"> -->
    <div class="card relative z-2">
      <Menubar :model="menus" >
        <template #start>
          <img alt="logo" src="/assets/icon/yeeLogo.png" height="30" class="mr-2" />
        </template>
      </Menubar>

    </div>
    <div class="responsiveSize">
      <router-view></router-view>
    </div>
  <!-- </div> -->
  <!-- <div v-else>
    <Login />
  </div> -->
  <VueLoading ref="preloader" loader="bars" :active="$store.getters.loader" :color="'#FFC107'" />
</template>

<script >
export default {
  data() {
    return {
      menus : [
        // {
        //     label: "Stock",
        //     icon: "pi pi-folder-open",
        //     to: "/",
        // },
        {
            label: "รายการสั่งของ",
            icon: "pi pi-book",
            to: "/",
        },
        {
            label: "จัดการสินค้า",
            icon: "pi pi-folder-open",
            to: "/cmsStock",
        },
    ]
    }
  },
  created() {
  document.documentElement.setAttribute('data-p-color-scheme', 'light');
  },methods: {
    logout() {
      this.$cookies.remove('token')
      this.$router.push('/')
      setTimeout(() => location.reload(), 500);
    }
  },
}

</script>

<style>

:root {
  color-scheme: light;
}

html,
body {
  height: 100%;
  margin: 0px;
  font-weight: 300;
  font-size: smaller;
  font-family: "Noto Sans Thai", sans-serif;
  background-color: whitesmoke;
}
.responsiveSize{
  margin-bottom:2rem !important;
}
.btn-size-cancel {
  width:30% !important;
}
.btn-size-accept {
  width: 30% !important;
}

.swal2-container {
  z-index: 20000 !important;
}

@media (min-width: 1024px) { /* lg */
  .btn-size-cancel {
  width:10% !important;
}
.btn-size-accept {
  width: 10% !important;
}
}
/* @media (prefers-color-scheme: dark) {
  body {
    background-color:whitesmoke !important;
    color:#000 !important;
  }
  .p-menubar {
    background: white !important;
  }
  .p-tablist-tab-list {
      background: #fff !important;
      color: #000000 !important;
  }
  .p-tabpanels {
      background: #fff !important;
      color: #000000 !important;
  }
  .p-dataview-content {
      background: #fff !important;
      color: #000000 !important;
  }
  .p-menubar-mobile .p-menubar-root-list {
    background: #fff !important;
    color: #000000 !important;
    border: 1px solid  #fff !important;
  }
  .p-menubar-button {
    background: #fff !important;
    color: #000000 !important;
  }
} */

</style>

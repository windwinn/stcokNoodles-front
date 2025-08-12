<template>
    <div v-if="visbleCms">
        <div class="card">
            <div class="col-12 lg:col-6">
                <div class="col-12">
                    <span class="titleCMS">รหัสผ่าน</span>
                </div>
                <div class="col-12">
                    <InputText type="text" v-model="nameDialog" style="width: 100%" @input="loginPage"/>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="card p-3">
    <!-- <div> -->
        <TabView v-model:activeIndex="active">
            <TabPanel>
                <template #header>
                <div class="tab-header-center">
                    <Avatar image="/assets/icon/cmsStock.png"/>
                    <span class="font-bold white-space-nowrap">วัตถุดิบ</span>
                </div>
                </template>
                <CmsStock ref="step1Ref"/>
            </TabPanel>
            <TabPanel>
                <template #header>
                <div class="tab-header-center">
                    <Avatar image="/assets/icon/cmsUnit.png"/>
                    <span class="font-bold white-space-nowrap">หน่วย</span>
                </div>
                </template>
                <CmsUnit  v-on:callUnitStock="callGetUnitsStock()" />
            </TabPanel>
        </TabView>
    </div>
</template>

<script>
import CmsStock from './subCms/CmsStock.vue'
import CmsUnit from './subCms/CmsUnit.vue'

export default {
    components: { CmsStock,CmsUnit},
    data() {
        return {
            visbleCms:true,
            active: 0,
            nameDialog:'',
            testStock:null
        }
    },
    methods: {
        loginPage(){
           if(this.nameDialog == 'pimwin1102'){
            this.visbleCms = false
           }
        }, callGetUnitsStock(){
           this.$refs.step1Ref.getUnits()
        }
    }
}
</script>

<style scoped>

.col-12{
    padding-bottom: 0px !important;
}
.titleCMS{
    font-size: 1.15rem;
    font-weight: 500;
}

::v-deep .p-tabview .p-tabview-panels {
  padding: 0rem !important;
}
::v-deep .p-tabview .p-tabview-nav li {
  width: 50%;
}

::v-deep .tab-header-center {
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 0.5rem;
  width: 100%;
  text-align: center;
}

</style>
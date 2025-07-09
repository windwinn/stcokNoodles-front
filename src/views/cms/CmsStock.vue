<template>
    <div class="card p-3">
    <DataTable :value="cmsStock" paginator :rows="15" :rowsPerPageOptions="[15,30]" responsiveLayout="scroll" removableSort v-model:filters="filters" 
                  :sortOrder="-1" :globalFilterFields="['name']" paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
          <template #header>
            <div class="flex justify-content-between">
                <div class="flex align-items-center">
                    <Avatar image="/assets/icon/packages.png"/>
                    <span class="font-bold white-space-nowrap ml-2">จัดการสินค้า</span>
                </div>
              <div class="flex justify-content-end">
                  <div class="mr-2">
                      <Button @click="openDialog('','new')" class="p-refresh" label="เพิ่ม" severity="danger" icon="pi pi-plus" />
                  </div>
                  <span class="p-input-icon-left">
                      <i class="pi pi-search" />
                      <InputText v-model="filters['global'].value" placeholder="ค้นหา" />
                  </span>
              </div>
            </div>
          </template>
            <Column style="width:10px">
                <template #body="slotProps">
                    <Button @click="openDialog(slotProps.data,'edit')" class="p-button-text p-button-secondary" icon="pi pi-pencil" />
                </template>
            </Column>
            <Column field="name" header="ชื่อสินค้า"></Column>
            <Column field="category" header="ประเภทสินค้า" sortable>
                <template #body="slotProps">
                    {{ formatCategory(slotProps.data.category) }}
                </template>
            </Column>
            <Column field="visible_item" header="แสดงสินค้า" sortable>
                <template #body="slotProps">
                    {{ formatVisibleItem(slotProps.data.visible_item) }}
                </template>
            </Column>
      </DataTable>
    </div>
        <Dialog v-model:visible="visibleCMS" modal header="จัดการสินค้า" :style="{ width: '80%' }"
        :closable="false" :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :baseZIndex="10" >
            <div class="grid">
                <div class="col-12 lg:col-6">
                    <div class="col-12">
                        <span class="titleCMS">ชื่อสินค้า</span>
                    </div>
                    <div class="col-12">
                        <InputText type="text" v-model="nameDialog" style="width: 100%"/>
                    </div>
                </div>
                <div class="col-12 lg:col-6">
                    <div class="col-12">
                        <span class="titleCMS">ประเภทสินค้า</span>
                    </div>
                    <div class="col-12">
                        <Dropdown
                            v-model="categoryDialog"
                            :options="productUnit"
                            optionLabel="name"
                            optionValue="value"
                            placeholder="เลือกหน่วย"
                            style="width: 100%"
                        />
                    </div>
                </div>
                <div class="col-12 lg:col-6">
                    <div class="col-12">
                        <span class="titleCMS">ประเภทหน่วย (คงเหลือ)</span>
                    </div>
                    <div class="col-12">
                        <Dropdown
                            v-model="remainUnitDialog"
                            :options="unit"
                            optionLabel="name"
                            optionValue="name"
                            placeholder="เลือกหน่วย"
                            style="width: 100%"
                        />
                    </div>
                </div>
                <div class="col-12 lg:col-6">
                    <div class="col-12">
                        <span class="titleCMS">ประเภทสินค้าหน่วย (สั่งเพิ่ม)</span>
                    </div>
                    <div class="col-12">
                        <Dropdown
                            v-model="orderUnitDialog"
                            :options="unit"
                            optionLabel="name"
                            optionValue="name"
                            placeholder="เลือกหน่วย"
                            style="width: 100%"
                        />
                    </div>
                </div>
                <div class="col-12 lg:col-6">
                    <div class="col-12">
                        <span class="titleCMS">แสดงสินค้า</span>
                    </div>
                    <div class="col-12">
                            <div class="flex flex-wrap gap-3">
                            <div class="flex align-items-center">
                                <RadioButton v-model="visibleItem" :value=true />
                                <label class="ml-2">แสดง</label>
                            </div>
                            <div class="flex align-items-center">
                                <RadioButton v-model="visibleItem" :value=false />
                                <label class="ml-2">ไม่แสดง</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 flex flex-row-reverse">
                    <Button
                    icon="pi pi-times"
                    severity="danger"
                    @click="cancel()"
                    label="ปิด"
                    autofocus
                    class="btn-size-cancel mr-2"
                    />
                    <Button
                    icon="pi pi-check"
                    type="submit"
                    severity="success"
                    @click="updateCMSStock()"
                    label="บันทึก"
                    autofocus
                    class="btn-size-accept mr-2"
                    />
                </div>
            </div>

           <!-- Action button -->


        </Dialog>
</template>

<script>

import { FilterMatchMode } from 'primevue/api';
import axios from 'axios'
import func from "../../helpers/func";

export default {
  data() {
    return {
        visibleCMS:false,
        visibleItem:true,
        typeDialog:null,
        idDialog:null,
        nameDialog:null,
        categoryDialog:null,
        remainUnitDialog:null,
        orderUnitDialog:null,
        unit:[],
        productUnit:[
            {
                name:'ของสด',
                value:'FF'
            },
            {
                name:'ผัก',
                value:'VT'
            }
        ],
        cmsStock:[],
        filters: {
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'name': { value: null, matchMode: FilterMatchMode.EQUALS },
        }
    };
  },
  methods: {
    formatCategory: func.formatCategory,
    formatVisibleItem: func.formatVisibleItem,
    alertMessage: func.alertMessage,
    show: func.show,
    close: func.close,
    openDialog(e,type){
        this.visibleCMS = true
        this.typeDialog = type
        if(this.typeDialog == 'edit'){
            this.idDialog = e?.id || ''
            this.nameDialog = e?.name || ''
            this.categoryDialog = e?.category || ''
            this.remainUnitDialog = e?.remain_unit
            this.orderUnitDialog = e?.order_unit
            this.visibleItem = e?.visible_item
        }
    },
    updateCMSStock(){
            // console.log("typeDialog "+this.typeDialog)
            // console.log("/master-products/"+this.idDialog)
            // console.log("name",this.nameDialog)
            // console.log("category",this.categoryDialog)
            // console.log("remain_unit",this.remainUnitDialog)
            // console.log("order_unit",this.orderUnitDialog)
            // console.log("note"," ")
            // console.log("visible_item",this.visibleItem)
        if(this.nameDialog == null || this.nameDialog == ''){
            this.alertMessage("กรุณากรอกชื่อสินค้า ","warning");
        }else if(this.categoryDialog == null || this.categoryDialog == ''){
            this.alertMessage("กรุณาเลือกประเภทสินค้า ","warning");
            return;
        }else  if(this.remainUnitDialog == null || this.remainUnitDialog == ''){
            this.alertMessage("กรุณาเลือกประเภทหน่วย (คงเหลือ) ","warning");
            return;
        }else if(this.orderUnitDialog == null || this.orderUnitDialog == ''){
            this.alertMessage("กรุณาเลือกประเภทหน่วย (สั่งเพิ่ม) ","warning");
            return;
        }else if(this.typeDialog == 'edit'){
            this.show()
            axios
              .put(`${import.meta.env.VITE_API_URL}/master-products/`+this.idDialog, {
                name: this.nameDialog,
                category: this.categoryDialog,
                remain: null,
                remain_unit: this.remainUnitDialog,
                order:"0",
                order_unit: this.orderUnitDialog,
                note: "",
                visible_item: this.visibleItem
              })
              .then((response) => {
                this.cancel()
                this.getCMSStock()
                this.alertMessage("บันทึกเสร็จสิ้น", "success");
              })
              .catch((error) => {
                console.error(
                  "เกิดข้อผิดพลาด:",
                  error.response?.data || error.message
                );
                this.alertMessage("ติดต่อผู้ที่ดูแลระบบ", "warning");
              });
        }else{
            this.show()
             axios
              .post(`${import.meta.env.VITE_API_URL}/master-products/`,{
                name: this.nameDialog,
                category: this.categoryDialog,
                remain: null,
                remain_unit: this.remainUnitDialog,
                order: "0",
                order_unit: this.orderUnitDialog,
                note: "",
                visible_item: this.visibleItem
              })
              .then((response) => {
                this.cancel()
                this.getCMSStock()
                this.alertMessage("บันทึกเสร็จสิ้น", "success");
              })
              .catch((error) => {
                console.error(
                  "เกิดข้อผิดพลาด:",
                  error.response?.data || error.message
                );
                this.alertMessage("ติดต่อผู้ที่ดูแลระบบ", "warning");
              });
        }
    },
    cancel(){
        this.visibleCMS = false
        this.idDialog = null
        this.nameDialog = null
        this.categoryDialog = null
        this.remainUnitDialog = null
        this.orderUnitDialog = null
        this.visibleItem = null
    },
    getCMSStock(){
        this.show()
        axios.get(`${import.meta.env.VITE_API_URL}/master-products-all/`)
          .then(response => {
              this.cmsStock = response.data
              this.close()
          }) .catch(error => {
            console.log("error : ", error);
            this.alertMessage("ติดต่อผู้ที่ดูแลระบบ", "warning");
          })
      },
    async getUnits() {
        this.show()
        await axios
        .get(`${import.meta.env.VITE_API_URL}/stocksUnit`)
        .then((response) => {
            this.unit = response.data;
            this.close()
        })
        .catch((error) => {
            console.log("error :", error);
            this.alertMessage("ติดต่อผู้ที่ดูแลระบบ", "warning");
        });
    },
  },created(){
    this.getCMSStock()
    this.getUnits();
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

.btn-size-cancel {
  width:50% !important;
}
.btn-size-accept {
  width: 50% !important;
}

@media (min-width: 1024px) { /* lg */
    .btn-size-cancel {
    width:20% !important;
    }
    .btn-size-accept {
    width: 20% !important;
    }
}
</style>
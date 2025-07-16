<template>
  <div class="card p-3">
    <TabView v-model:activeIndex="active">
      <TabPanel>
        <template #header>
          <div class="tab-header-center">
            <Avatar image="/assets/icon/barbecue.png"/>
            <span class="font-bold white-space-nowrap">ของสด</span>
          </div>
        </template>
        <DataTable :value="freshFoods" :responsiveLayout="responsiveMode">
          <Column field="name" header="ชื่อวัตถุดิบ">
            <template #body="{ data, field }">
              <span class="font-bold" >{{ data[field] }}</span>
            </template>
          </Column>
          <Column field="remain" header="คงเหลือ">
            <template #body="{ data, field }">
              <span v-if="disabledAllField">{{ data[field] }}</span>
              <InputNumber
                v-else
                v-model="data[field]"
                :min="0"
                :style="{ width: '75%' }"
                showButtons
                buttonLayout="horizontal"
                :maxFractionDigits="1" 
              >
                <template #incrementbuttonicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
            </template>
          </Column>

          <Column field="remain_unit" header="หน่วย">
            <template #body="{ data, field }">
              <span v-if="disabledAllField">{{ data[field] }}</span>
              <Dropdown
                v-else
                v-model="data[field]"
                :options="unit"
                optionLabel="name"
                optionValue="name"
                placeholder="เลือกหน่วย"
                style="width: 75%"
              />
            </template>
          </Column>

          <Column field="order" header="สั่งเพิ่ม">
            <template #body="{ data, field }">
              <span v-if="disabledAllField">{{ data[field] }}</span>
              <InputNumber
                v-else
                v-model="data[field]"
                :min="0"
                :style="{ width: '75%' }"
                showButtons
                buttonLayout="horizontal"
                :maxFractionDigits="1" 
              >
                <template #incrementbuttonicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
            </template>
          </Column>

          <Column field="order_unit" header="หน่วย">
            <template #body="{ data, field }">
              <span v-if="disabledAllField">{{ data[field] }}</span>
              <Dropdown
                v-else
                v-model="data[field]"
                :options="unit"
                optionLabel="name"
                optionValue="name"
                placeholder="เลือกหน่วย"
                style="width: 75%"
              />
            </template>
          </Column>

          <Column field="note" header="หมายเหตุ">
            <template #body="{ data, field }">
              <span v-if="disabledAllField">{{ data[field] }}</span>
              <InputText
                v-else
                v-model="data[field]"
                :style="{ width: '75%' }"
              />
            </template>
          </Column>
        </DataTable>
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="tab-header-center">
            <Avatar image="/assets/icon/note.png"/>
            <span class="font-bold white-space-nowrap">เพิ่มเติม</span>
          </div>
        </template>
        <div class="grid mt-3 mb-3">
               <div class="col-12 lg:col-2 pl-4">
                 <p class="text-xl font-bold">หมายเหตุ : </p>
               </div>
               <div class="col-12 lg:col-10 p-4">
                <span v-if="disabledAllField" class="font-bold text-lg">{{this.notes}}</span>
                <Textarea v-else v-model="notes" class="w-full" rows="5"   :disabled="disabledAllField" />
               </div>
        </div>
      </TabPanel>
    </TabView>
  </div>

  <!-- Tab button -->

  <div class="flex mb-2 gap-2 justify-content-end pr-3">
      <Button @click="active = 0" rounded label="ของสด" :outlined="active !== 0">
        <Avatar image="/assets/icon/barbecue.png"/>
        <span class="pl-2">ของสด</span>
      </Button>
      <Button @click="active = 1" rounded label="เพิ่มเติม" :outlined="active !== 1" >
        <Avatar image="/assets/icon/note.png" shape="circle" />
        <span class="pl-2">เพิ่มเติม</span>
      </Button>
  </div>

  <!-- Action button -->

  <div class="col-12 flex flex-row-reverse">
    <Button
      v-if="this.id"
      icon="pi pi-chevron-left"
      severity="info"
      @click="cancel()"
      label="ย้อนกลับ"
      autofocus
      class="btn-size-cancel mr-2"
    />
    <Button
     v-if="this.id"
      icon="pi pi-send"
      severity="success"
      @click="sendLine()"
      label="ส่งข้อมูล"
      autofocus
      class="btn-size-success mr-2">
      <i class="fa-brands fa-line fa-xl"></i>
      <span class="px-3">ส่งข้อมูล</span>
    </Button>
    <Button
      v-if="!this.id"
      icon="pi pi-times"
      label="ยกเลิก"
      severity="danger"
      @click="cancel()"
      class="btn-size-cancel"
      autofocus
    />
    <Button
      v-if="!this.id"
      icon="pi pi-check"
      type="submit"
      severity="success"
      @click="submitForm()"
      label="บันทึก"
      autofocus
      class="btn-size-accept mr-2"
    />
  </div>

</template>
  <script>
import func from "../../helpers/func";
import axios from "axios";
import moment from 'moment-timezone';

export default {
  props: ["stockId"],
  emits: ["close"],
  data() {
    return {
      id: this.stockId,
      active: 0,
      disabledAllField: false,
      products: [],
      freshFoods: [],
      notes:'',
      unit: [],
      responsiveMode: 'stack',
      statusStock:'created'
    };
  },
  methods: {
  alertMessage: func.alertMessage,
  show: func.show,
  close: func.close,
  submitForm() {
      const missingRemainFF = this.freshFoods.filter((p) => p.remain === null);
      const orderRemainFF = this.freshFoods.filter((p) => p.order === null);

      if (missingRemainFF.length > 0) {
        this.alertMessage(
          "กรุณากรอกยอดคงเหลือ : " + missingRemainFF[0].name,
          "warning"
        );
        return;
      } else if (orderRemainFF.length > 0) {
        this.alertMessage(
          "กรุณากรอกจำนวนที่สั่งเพิ่ม : " + orderRemainFF[0].name,
          "warning"
        );
        return;
      }else if (missingRemainFF.length == [] && orderRemainFF.length == []) {
        this.$swal({
          icon: "question",
          title: "คุณต้องการบันทึกรายการนี้หรือไม่?",
          showCancelButton: true,
          confirmButtonText: "Yes",
          confirmButtonColor: "#D32F2F",
        }).then((result) => {
          if (result.isConfirmed) {
            const createDate = moment().tz('Asia/Bangkok').format(); 
            this.products = this.freshFoods
            // console.log("create_date",createDate)
            // console.log("create_by",'พี่จ๋อย')
            // console.log("create_by_id",1)
            // console.log("products",this.products)
            axios
              .post(`${import.meta.env.VITE_API_URL}/stocks/`, {
                create_date: createDate,
                create_by: "พี่จ๋อย",
                create_by_id: 1,
                notes:this.notes,
                category:'FF',
                products: this.products,
              })
              .then((response) => {
                this.alertMessage("บันทึกเสร็จสิ้น", "success");
                this.$router.push("/");
              })
              .catch((error) => {
                console.error(
                  "เกิดข้อผิดพลาด:",
                  error.response?.data || error.message
                );
                this.alertMessage("ติดต่อผู้ที่ดูแลระบบ", "warning");
              });
          }
        });
      }
    },
    cancel() {
      this.$router.push("/");
    },
    getDataId() {
      if (this.id !== undefined) {
        this.show()
        this.responsiveMode = 'scroll'
          axios
          .get(`${import.meta.env.VITE_API_URL}/stocks/FF/` + this.id)
          .then((response) => {
            const products = response.data.products;
            this.statusStock = response.data.status;
            // console.log('response.data.status', response.data.status)
            // this.responsiveMode = this.statusStock === 'broadcasts' ? 'scroll' :'stack';
            this.disabledAllField = true;
          // console.log(' this.responsiveMode', this.responsiveMode)
            const freshFoodValue = products.filter(
              (element) => element.category == "FF"
            );
            this.notes = response.data.notes || ''
            this.freshFoods = freshFoodValue;
            this.close()
          })
          .catch((error) => {
            console.log("error :", error);
            this.alertMessage("ติดต่อผู้ที่ดูแลระบบ", "warning");
          });

      }else{   
        this.getMasterDataCMS();
      }
    },
    async getUnits() {
      this.show()
      await axios
        .get(`${import.meta.env.VITE_API_URL}/units`)
        .then((response) => {
          this.unit = response.data;
          this.close()
        })
        .catch((error) => {
          console.log("error :", error);
          this.alertMessage("ติดต่อผู้ที่ดูแลระบบ", "warning");
        });
    },
    getMasterDataCMS(){
      this.show()
        axios.get(`${import.meta.env.VITE_API_URL}/master-products/`)
          .then(response => {
            const products = response.data;
            const freshFoodValue = products.filter(
              (element) => element.category == "FF"
            );
            this.freshFoods = freshFoodValue.map(element => ({
              ...element,
              order: parseInt(element.order, 10)
            }));
            this.close()
          }) .catch(error => {
            console.log("error : ", error);
            this.alertMessage("ติดต่อผู้ที่ดูแลระบบ", "warning");
          })
    },
    sendLine() {
      this.$swal({
        icon: "question",
        title: "คุณต้องการส่งข้อมูลนี้หรือไม่?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#D32F2F",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios
            .get(`${import.meta.env.VITE_API_URL}/stocks/line/FF/`+ this.id)
            .then((response) => {
              if (response.status == 200) {
                this.alertMessage("ส่งข้อมูลเรียบร้อย", "success");
                this.$router.push("/");
              }
            })
            .catch((error) => {
              console.log("error :", error);
              this.alertMessage("ติดต่อผู้ที่ดูแลระบบ", "warning");
            });
        }
      });
    },
  },
  created() {
    this.getUnits();
    this.getDataId();
  }
};
</script>
<style scoped>
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

  
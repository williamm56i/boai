import { createApp } from 'vue';
// import { VueReCaptcha } from 'vue-recaptcha-v3';
import './style.css';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import PanelMenu from 'primevue/panelmenu';
import Breadcrumb from 'primevue/breadcrumb';
import Avatar from 'primevue/avatar';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TabMenu from 'primevue/tabmenu';
import Menu from 'primevue/menu';
import Carousel from 'primevue/carousel';
import Divider from 'primevue/divider';
import ProgressSpinner from 'primevue/progressspinner';
import Skeleton from 'primevue/skeleton';
import Dialog from 'primevue/dialog';
import Fieldset from 'primevue/fieldset';
import Panel from 'primevue/panel';
import Password from 'primevue/password';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import FloatLabel from 'primevue/floatlabel';
import FileUpload from 'primevue/fileupload';
import SelectButton from 'primevue/selectbutton';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import DatePicker from 'primevue/datepicker';
import RadioButton from 'primevue/radiobutton';

const BoaiPreset = definePreset(Aura, Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        }
    }
});

createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: BoaiPreset
        }
    })
    .use(ToastService)
    .use(ConfirmationService)
    // .use(VueReCaptcha, {
    //     siteKey: '6Ld6omkqAAAAALiIBYRtU9_dvqywGkK2bTxghQCM',
    //     loaderOptions: {
    //         useRecaptchaNet: true,
    //     },
    // })
    .component('PanelMenu', PanelMenu)
    .component('Breadcrumb', Breadcrumb)
    .component('Avatar', Avatar)
    .component('Card', Card)
    .component('InputText', InputText)
    .component('Button', Button)
    .component('DataTable', DataTable)
    .component('Column', Column)
    .component('TabMenu', TabMenu)
    .component('Menu', Menu)
    .component('Carousel', Carousel)
    .component('Divider', Divider)
    .component('ProgressSpinner', ProgressSpinner)
    .component('Skeleton', Skeleton)
    .component('Dialog', Dialog)
    .component('Fieldset', Fieldset)
    .component('Panel', Panel)
    .component('Password', Password)
    .component('FloatLabel', FloatLabel)
    .component('FileUpload', FileUpload)
    .component('SelectButton', SelectButton)
    .component('Select', Select)
    .component('Textarea', Textarea)
    .component('Toast', Toast)
    .component('ConfirmPopup', ConfirmPopup)
    .component('DatePicker', DatePicker)
    .component('RadioButton', RadioButton)
    .use(router)
    .mount('#app');

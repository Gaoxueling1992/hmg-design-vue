import type { App } from 'vue';
import ReportContainer from './ReportContainer.vue';
import TableContainer from './TableContainer.vue';
import EditCanvas from './editCanvasArea/EditCanvas.vue';

const components: any[] = [ReportContainer, TableContainer, EditCanvas];

const install = (app: App) => {
  components.forEach(component => app.component(component.name, component));
};

export {
  ReportContainer, TableContainer, EditCanvas
}

export default {
  install,
  ...components
};
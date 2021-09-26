import { Panel } from "src/app/core/models/panel.model";
import { Permission } from "src/app/core/models/permission.model";

export interface PermissionsByPanel {
  panel: Panel;
  permisos: Permission[];
}

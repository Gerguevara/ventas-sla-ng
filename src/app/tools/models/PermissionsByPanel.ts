import { Panel } from "@models/panel.model";
import { Permission } from "@models/permission.model";

export interface PermissionsByPanel {
  panel: Panel;
  permisos: Permission[];
}

import { ElMessage } from 'element-plus';
import 'element-plus/dist/index.css';

export function myMessage(message: string, type: any) {
  ElMessage({
    customClass: 'my-el-message',
    showClose: true,
    message,
    type,
  });
}

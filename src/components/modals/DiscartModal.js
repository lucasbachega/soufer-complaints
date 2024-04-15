import { WarningOutlined } from "@mui/icons-material";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Modal,
    ModalClose,
    ModalDialog,
} from "@mui/joy";
import { Component } from "react";

export default class DiscartModal extends Component {
  static componentInstance;

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      action: null,
    };

    DiscartModal.componentInstance = this;

    // Bind the methods to the class instance
    this._show = this._show.bind(this);
    this._close = this._close.bind(this);
  }

  static show(action) {
    DiscartModal.componentInstance._show(action);
  }

  _show(action) {
    this.setState({
      visible: true,
      action,
    });
  }
  _close() {
    this.setState({
      visible: false,
      action: null,
    });
  }

  _onClickAction(action) {
    if (action && typeof action === "function") {
      action();
    }
    this._close();
  }

  render() {
    const { action, visible } = this.state;
    return (
      visible && (
        <Modal open={visible} onClose={this._close}>
          <ModalDialog variant="outlined" role="alertdialog">
            <ModalClose />
            <DialogTitle>
              <WarningOutlined sx={{ mr: 1 }} />
              Descartar alterações
            </DialogTitle>
            <Divider />
            <DialogContent>
              Você possui alterações não salvas, deseja descartar?
            </DialogContent>
            <DialogActions>
              <Button
                variant="solid"
                color="danger"
                onClick={() => this._onClickAction(action)}
              >
                Descartar
              </Button>
              <Button variant="outlined" color="neutral" onClick={this._close}>
                Cancelar
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      )
    );
  }
}

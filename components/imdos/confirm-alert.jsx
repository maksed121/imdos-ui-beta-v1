"use client";
import toast from "react-hot-toast";
import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import { useImdosUI } from "@/providers/ImdosProvider";

export default function ConfirmAlert() {
  const { confirmAlert, setConfirmAlert, loading, setLoading } = useImdosUI();

  const handleConfirm = async () => {
    setLoading(true);
    if (confirmAlert.action) {
      confirmAlert.action();
    } else {
      try {
        const formData = new FormData();
        formData.append("refId", confirmAlert?.refId);
        const request = await fetch(
          `/api/imdos/${confirmAlert?.table}/delete`,
          {
            method: "POST",
            body: formData,
          }
        );

        const response = await request.json();

        if (!request.ok) {
          throw new Error(response.message);
        }

        confirmAlert.mutate();
        toast.success(response.message);
      } catch (error) {
        toast.error(error.message);
      }
    }
    setConfirmAlert("");
    setLoading(false);
  };

  return (
    <>
      <Modal
        backdrop={"blur"}
        isOpen={confirmAlert?.open}
        className="dark:bg-zinc-950 border"
        onClose={() => {
          setConfirmAlert({ open: false, refId: null });
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-zinc-100 dark:bg-zinc-900">
                Are you absolutely sure?
              </ModalHeader>
              <ModalBody>
                <p className="text-[14px] pt-3">
                  {confirmAlert.message ??
                    "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="bordered" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={loading}
                  disabled={loading}
                  color="primary"
                  onPress={handleConfirm}
                >
                  {confirmAlert.confirmText ?? "Delete"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* <AlertDialog
        open={confirmAlert?.open}
        onOpenChange={() => setConfirmAlert({ open: false, refId: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAlert.message ??
                "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-red-600 text-white"
              onClick={handleConfirm}
            >
              {confirmAlert.confirmText ?? "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}

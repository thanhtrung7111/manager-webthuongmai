import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import { any } from "zod";

const DialogCreateAdvertisement = ({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
}) => {
  useEffect(() => {
    console.log(id);
  }, [id]);
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[650px] w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-gray-600">
            Thông tin chi tiết quảng cáo
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-x-2">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <img src="" alt="" />
          </AspectRatio>
          <div></div>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateAdvertisement;

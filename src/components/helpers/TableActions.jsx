import { Archive, ArchiveRestore, FilePenLine, Trash } from "lucide-react";

export const ActionEdit = ({ handleClick }) => {
  return (
    <li>
      <button type="button" data-tooltip="Edit" onClick={() => handleClick()}>
        <FilePenLine size={14} />
      </button>
    </li>
  );
};

export const ActionArchive = ({ handleClick }) => {
  return (
    <li>
      <button
        type="button"
        data-tooltip="Archive"
        onClick={() => handleClick()}
      >
        <Archive size={14} />
      </button>
    </li>
  );
};

export const ActionRestore = ({ handleClick }) => {
  return (
    <li>
      <button
        type="button"
        data-tooltip="Restore"
        onClick={() => handleClick()}
      >
        <ArchiveRestore size={14} />
      </button>
    </li>
  );
};

export const ActionRemove = ({ handleClick }) => {
  return (
    <li>
      <button type="button" data-tooltip="Delete" onClick={() => handleClick()}>
        <Trash size={14} />
      </button>
    </li>
  );
};

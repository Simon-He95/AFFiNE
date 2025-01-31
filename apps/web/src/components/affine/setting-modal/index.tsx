import { Modal, ModalCloseButton, ModalWrapper } from '@affine/component';
import type {
  AffineLegacyCloudWorkspace,
  LocalWorkspace,
} from '@affine/env/workspace';
import { WorkspaceFlavour } from '@affine/env/workspace';
import { useAFFiNEI18N } from '@affine/i18n/hooks';
import { ContactWithUsIcon } from '@blocksuite/icons';
import type { NextRouter } from 'next/router';
import type React from 'react';
import { useCallback, useMemo, useState } from 'react';

import { useCurrentWorkspace } from '../../../hooks/current/use-current-workspace';
import { useWorkspaces } from '../../../hooks/use-workspaces';
import type { BlockSuiteWorkspace } from '../../../shared';
import { AccountSetting } from './account-setting';
import {
  GeneralSetting,
  type GeneralSettingKeys,
  generalSettingList,
} from './general-setting';
import { SettingSidebar } from './setting-sidebar';
import { settingContent } from './style.css';
import type { Workspace } from './type';
import { WorkSpaceSetting } from './workspace-setting';

export type QuickSearchModalProps = {
  currentWorkspace?: BlockSuiteWorkspace;
  workspaceList?: BlockSuiteWorkspace[];
  open: boolean;
  setOpen: (value: boolean) => void;
  router: NextRouter;
};

export const SettingModal: React.FC<QuickSearchModalProps> = ({
  open,
  setOpen,
}) => {
  const t = useAFFiNEI18N();
  const workspaces = useWorkspaces();
  const [currentWorkspace] = useCurrentWorkspace();

  const workspaceList = useMemo(() => {
    return workspaces.filter(
      ({ flavour }) => flavour !== WorkspaceFlavour.PUBLIC
    ) as Workspace[];
  }, [workspaces]);

  const [currentRef, setCurrentRef] = useState<{
    workspace: Workspace | null;
    generalKey: GeneralSettingKeys | null;
    isAccount: boolean;
  }>({
    workspace: null,
    generalKey: generalSettingList[0].key,
    isAccount: false,
  });
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onGeneralSettingClick = useCallback((key: GeneralSettingKeys) => {
    setCurrentRef({
      workspace: null,
      generalKey: key,
      isAccount: false,
    });
  }, []);
  const onWorkspaceSettingClick = useCallback((workspace: Workspace) => {
    setCurrentRef({
      workspace: workspace,
      generalKey: null,
      isAccount: false,
    });
  }, []);
  const onAccountSettingClick = useCallback(() => {
    setCurrentRef({
      workspace: null,
      generalKey: null,
      isAccount: true,
    });
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      wrapperPosition={['center', 'center']}
      data-testid="setting-modal"
    >
      <ModalWrapper
        width={1080}
        height={760}
        style={{
          maxHeight: '85vh',
          maxWidth: '70vw',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        <ModalCloseButton top={16} right={20} onClick={handleClose} />

        <SettingSidebar
          generalSettingList={generalSettingList}
          onGeneralSettingClick={onGeneralSettingClick}
          currentWorkspace={
            currentWorkspace as AffineLegacyCloudWorkspace | LocalWorkspace
          }
          workspaceList={workspaceList}
          onWorkspaceSettingClick={onWorkspaceSettingClick}
          selectedGeneralKey={currentRef.generalKey}
          selectedWorkspace={currentRef.workspace}
          onAccountSettingClick={onAccountSettingClick}
        />

        <div className={settingContent}>
          <div className="wrapper">
            <div className="content">
              {currentRef.workspace ? (
                <WorkSpaceSetting workspace={currentRef.workspace} />
              ) : null}
              {currentRef.generalKey ? (
                <GeneralSetting generalKey={currentRef.generalKey} />
              ) : null}
              {currentRef.isAccount ? <AccountSetting /> : null}
            </div>
            <div className="footer">
              <ContactWithUsIcon />
              <a href="https://community.affine.pro/home" target="_blank">
                {t[
                  'Need more customization options? You can suggest them to us in the community.'
                ]()}
              </a>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </Modal>
  );
};

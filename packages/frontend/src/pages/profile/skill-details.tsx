import { useMutation } from '@apollo/client';
import React from 'react';
import { toast } from 'react-toastify';

import SkillContextProvider from '@/components/skill-management/SkillContextProvider';
import {
  SkillDetails,
  UserSkillTemplate,
} from '@/components/templates/ProfileSkillTemplate';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { UpdateGrowMapSkillDetails } from '@/graphql/mutations';
import { getMe } from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import useLang from '@/hooks/useLang';
import { KnowledgeMatriz, SelectedSkills, User } from '@/types';

type RequestProps = {
  allKnowledgeMatriz: KnowledgeMatriz[];
  me: User;
  refetch: () => void;
};

const ProfileSkillDetails = () => {
  const i18n = useLang();

  const [onUpdateGrowMapSkills] = useMutation(UpdateGrowMapSkillDetails);

  const onSave = async (selectedSkills: SelectedSkills[], refetch) => {
    const knowledgeSkillDetails = selectedSkills.map(
      ({ isMentor, knowledgeMatrizId, knowledgeSkillId }) => ({
        isMentor,
        knowledgeMatrizId,
        knowledgeSkillId,
      }),
    );

    try {
      await onUpdateGrowMapSkills({
        variables: {
          data: {
            knowledgeSkillDetails,
          },
        },
      });

      await refetch();
      toast.info(i18n.get('your-request-completed-successfully'));
    } catch (error) {
      toast.error(i18n.get('an-unexpected-error-occurred'));
    }
  };

  return (
    <WrappedSafeComponent query={getMe}>
      {({ me, refetch }: RequestProps) => {
        const knowledgeSkillDetails = me.growMap?.knowledgeSkillDetails || [];

        const selectedSkills: SelectedSkills[] = knowledgeSkillDetails.map(
          ({ isMentor = false, knowledgeMatriz, knowledgeSkill }) => ({
            isMentor,
            knowledgeMatrizId: knowledgeMatriz.id,
            knowledgeSkillId: knowledgeSkill.id,
          }),
        );

        return (
          <UserSkillTemplate title={i18n.get('skills-details')} me={me}>
            <SkillContextProvider defaultState={{ selectedSkills }}>
              <SkillDetails onSave={(skills) => onSave(skills, refetch)} />
            </SkillContextProvider>
          </UserSkillTemplate>
        );
      }}
    </WrappedSafeComponent>
  );
};

export default withAuth(ProfileSkillDetails);

import { IconButton, TextField } from '@radix-ui/themes';
import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { FC, useState } from 'react';
type Props = TextField.RootProps & React.RefAttributes<HTMLInputElement>;

export const PasswordField: FC<Props> = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <TextField.Root
      name="password"
      placeholder="Password"
      required
      {...props}
      type={isPasswordVisible ? 'text' : 'password'}
    >
      <TextField.Slot side="right">
        <IconButton
          variant="ghost"
          size="1"
          type="button"
          radius="full"
          color="gray"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
        >
          {isPasswordVisible ? <EyeClosedIcon /> : <EyeIcon />}
        </IconButton>
      </TextField.Slot>
    </TextField.Root>
  );
};

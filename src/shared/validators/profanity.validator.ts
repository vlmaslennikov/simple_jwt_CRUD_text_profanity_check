import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { profanity } from '@2toad/profanity';

@ValidatorConstraint({ name: 'ProfanityValidator', async: false })
export class ProfanityValidator implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments): boolean {
    const languages = []
    languages[0] = { key: 'en', value: profanity.exists(text, ['en']) };
    languages[1] = { key: 'es', value: profanity.exists(text, ['es']) };
    languages[2] = { key: 'de', value: profanity.exists(text, ['de']) };
    languages[3] = { key: 'fr', value: profanity.exists(text, ['fr']) };
    const result = languages.map((el) => el.value ? el.key : null).filter((x) => x)

    if (result.length) {
      (args.object as any).languages = result.join(',')
      return false
    }
    return true
  }

  defaultMessage(args: ValidationArguments): string {
    return `Contains profanity. Detected in languages: ${(args.object as any).languages}`;
  }
}


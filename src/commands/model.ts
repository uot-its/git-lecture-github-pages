export type CommandTool = 'git' | 'gh';

export type RiskLevel = 'safe' | 'caution' | 'danger';

export type CommandOption = Readonly<{
  syntax: string;
  description: string;
}>;

export type CommandRecipe = Readonly<{
  id: string;
  number: number;
  tool: CommandTool;
  category: string;
  title: string;
  summary: string;
  usage: string;
  command: string;
  options: readonly [CommandOption, ...CommandOption[]];
  risk: RiskLevel;
  warning: string;
  keywords: readonly string[];
  docsUrl: string;
}>;

export type CommandCategory = Readonly<{
  id: string;
  tool: CommandTool;
  label: string;
  description: string;
}>;

export type CommandFilters = Readonly<{
  query: string;
  tool: CommandTool | 'all';
  category: string | 'all';
  risk: RiskLevel | 'all';
}>;
